package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.Filiere;
import mefpai.gouv.sn.repository.FiliereRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.FiliereService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.Filiere}.
 */
@RestController
@RequestMapping("/api")
public class FiliereResource {

    private final Logger log = LoggerFactory.getLogger(FiliereResource.class);

    private static final String ENTITY_NAME = "filiere";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FiliereService filiereService;

    private final FiliereRepository filiereRepository;

    public FiliereResource(FiliereService filiereService, FiliereRepository filiereRepository) {
        this.filiereService = filiereService;
        this.filiereRepository = filiereRepository;
    }

    /**
     * {@code POST  /filieres} : Create a new filiere.
     *
     * @param filiere the filiere to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new filiere, or with status {@code 400 (Bad Request)} if the filiere has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/filieres")
    public ResponseEntity<Filiere> createFiliere(@Valid @RequestBody Filiere filiere) throws URISyntaxException {
        log.debug("REST request to save Filiere : {}", filiere);
        if (filiere.getId() != null) {
            throw new BadRequestAlertException("A new filiere cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Filiere result = filiereService.save(filiere);
        return ResponseEntity
            .created(new URI("/api/filieres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /filieres/:id} : Updates an existing filiere.
     *
     * @param id the id of the filiere to save.
     * @param filiere the filiere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated filiere,
     * or with status {@code 400 (Bad Request)} if the filiere is not valid,
     * or with status {@code 500 (Internal Server Error)} if the filiere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/filieres/{id}")
    public ResponseEntity<Filiere> updateFiliere(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Filiere filiere
    ) throws URISyntaxException {
        log.debug("REST request to update Filiere : {}, {}", id, filiere);
        if (filiere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, filiere.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!filiereRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Filiere result = filiereService.save(filiere);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, filiere.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /filieres/:id} : Partial updates given fields of an existing filiere, field will ignore if it is null
     *
     * @param id the id of the filiere to save.
     * @param filiere the filiere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated filiere,
     * or with status {@code 400 (Bad Request)} if the filiere is not valid,
     * or with status {@code 404 (Not Found)} if the filiere is not found,
     * or with status {@code 500 (Internal Server Error)} if the filiere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/filieres/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Filiere> partialUpdateFiliere(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Filiere filiere
    ) throws URISyntaxException {
        log.debug("REST request to partial update Filiere partially : {}, {}", id, filiere);
        if (filiere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, filiere.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!filiereRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Filiere> result = filiereService.partialUpdate(filiere);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, filiere.getId().toString())
        );
    }

    /**
     * {@code GET  /filieres} : get all the filieres.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of filieres in body.
     */
    @GetMapping("/filieres")
    public ResponseEntity<List<Filiere>> getAllFilieres(Pageable pageable) {
        log.debug("REST request to get a page of Filieres");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<Filiere> page = filiereService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (filiereService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((filiereRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /filieres/:id} : get the "id" filiere.
     *
     * @param id the id of the filiere to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the filiere, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/filieres/{id}")
    public ResponseEntity<Filiere> getFiliere(@PathVariable Long id) {
        log.debug("REST request to get Filiere : {}", id);
        Optional<Filiere> filiere = filiereService.findOne(id);
        return ResponseUtil.wrapOrNotFound(filiere);
    }

    /**
     * {@code DELETE  /filieres/:id} : delete the "id" filiere.
     *
     * @param id the id of the filiere to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/filieres/{id}")
    public ResponseEntity<Void> deleteFiliere(@PathVariable Long id) {
        log.debug("REST request to delete Filiere : {}", id);
        filiereService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}

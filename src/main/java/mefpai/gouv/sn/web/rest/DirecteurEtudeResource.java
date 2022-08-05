package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.DirecteurEtude;
import mefpai.gouv.sn.repository.DirecteurEtudeRepository;
import mefpai.gouv.sn.service.DirecteurEtudeService;
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
 * REST controller for managing {@link mefpai.gouv.sn.domain.DirecteurEtude}.
 */
@RestController
@RequestMapping("/api")
public class DirecteurEtudeResource {

    private final Logger log = LoggerFactory.getLogger(DirecteurEtudeResource.class);

    private static final String ENTITY_NAME = "directeurEtude";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DirecteurEtudeService directeurEtudeService;

    private final DirecteurEtudeRepository directeurEtudeRepository;

    public DirecteurEtudeResource(DirecteurEtudeService directeurEtudeService, DirecteurEtudeRepository directeurEtudeRepository) {
        this.directeurEtudeService = directeurEtudeService;
        this.directeurEtudeRepository = directeurEtudeRepository;
    }

    /**
     * {@code POST  /directeur-etudes} : Create a new directeurEtude.
     *
     * @param directeurEtude the directeurEtude to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new directeurEtude, or with status {@code 400 (Bad Request)} if the directeurEtude has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/directeur-etudes")
    public ResponseEntity<DirecteurEtude> createDirecteurEtude(@Valid @RequestBody DirecteurEtude directeurEtude)
        throws URISyntaxException {
        log.debug("REST request to save DirecteurEtude : {}", directeurEtude);
        if (directeurEtude.getId() != null) {
            throw new BadRequestAlertException("A new directeurEtude cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DirecteurEtude result = directeurEtudeService.save(directeurEtude);
        return ResponseEntity
            .created(new URI("/api/directeur-etudes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /directeur-etudes/:id} : Updates an existing directeurEtude.
     *
     * @param id the id of the directeurEtude to save.
     * @param directeurEtude the directeurEtude to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated directeurEtude,
     * or with status {@code 400 (Bad Request)} if the directeurEtude is not valid,
     * or with status {@code 500 (Internal Server Error)} if the directeurEtude couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/directeur-etudes/{id}")
    public ResponseEntity<DirecteurEtude> updateDirecteurEtude(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DirecteurEtude directeurEtude
    ) throws URISyntaxException {
        log.debug("REST request to update DirecteurEtude : {}, {}", id, directeurEtude);
        if (directeurEtude.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, directeurEtude.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!directeurEtudeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DirecteurEtude result = directeurEtudeService.save(directeurEtude);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, directeurEtude.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /directeur-etudes/:id} : Partial updates given fields of an existing directeurEtude, field will ignore if it is null
     *
     * @param id the id of the directeurEtude to save.
     * @param directeurEtude the directeurEtude to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated directeurEtude,
     * or with status {@code 400 (Bad Request)} if the directeurEtude is not valid,
     * or with status {@code 404 (Not Found)} if the directeurEtude is not found,
     * or with status {@code 500 (Internal Server Error)} if the directeurEtude couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/directeur-etudes/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<DirecteurEtude> partialUpdateDirecteurEtude(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DirecteurEtude directeurEtude
    ) throws URISyntaxException {
        log.debug("REST request to partial update DirecteurEtude partially : {}, {}", id, directeurEtude);
        if (directeurEtude.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, directeurEtude.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!directeurEtudeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DirecteurEtude> result = directeurEtudeService.partialUpdate(directeurEtude);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, directeurEtude.getId().toString())
        );
    }

    /**
     * {@code GET  /directeur-etudes} : get all the directeurEtudes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of directeurEtudes in body.
     */
    @GetMapping("/directeur-etudes")
    public ResponseEntity<List<DirecteurEtude>> getAllDirecteurEtudes(Pageable pageable) {
        log.debug("REST request to get a page of DirecteurEtudes");
        Page<DirecteurEtude> page = directeurEtudeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /directeur-etudes/:id} : get the "id" directeurEtude.
     *
     * @param id the id of the directeurEtude to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the directeurEtude, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/directeur-etudes/{id}")
    public ResponseEntity<DirecteurEtude> getDirecteurEtude(@PathVariable Long id) {
        log.debug("REST request to get DirecteurEtude : {}", id);
        Optional<DirecteurEtude> directeurEtude = directeurEtudeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(directeurEtude);
    }

    /**
     * {@code DELETE  /directeur-etudes/:id} : delete the "id" directeurEtude.
     *
     * @param id the id of the directeurEtude to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/directeur-etudes/{id}")
    public ResponseEntity<Void> deleteDirecteurEtude(@PathVariable Long id) {
        log.debug("REST request to delete DirecteurEtude : {}", id);
        directeurEtudeService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
